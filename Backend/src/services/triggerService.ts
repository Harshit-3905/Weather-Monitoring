import prisma from "../db/db";
import { sendEmail } from "./emailService";

export const checkTriggers = async (weatherData: any) => {
  const triggers = await prisma.userNotification.findMany({
    where: { city: weatherData.city },
  });

  for (const trigger of triggers) {
    let isTriggered = false;
    let actualValue: number | null = null;

    switch (trigger.parameter) {
      case "temp":
        actualValue = weatherData.temp;
        isTriggered =
          actualValue !== null
            ? trigger.isAbove
              ? actualValue > trigger.triggerTemp!
              : actualValue < trigger.triggerTemp!
            : false;
        break;
      case "humidity":
        actualValue = weatherData.humidity;
        isTriggered =
          actualValue !== null
            ? trigger.isAbove
              ? actualValue > trigger.triggerHumidity!
              : actualValue < trigger.triggerHumidity!
            : false;
        break;
      case "pressure":
        actualValue = weatherData.pressure;
        isTriggered =
          actualValue !== null
            ? trigger.isAbove
              ? actualValue > trigger.triggerPressure!
              : actualValue < trigger.triggerPressure!
            : false;
        break;
    }
    if (isTriggered && actualValue !== null) {
      await sendNotification(trigger, actualValue);
    }
  }
};

const sendNotification = async (trigger: any, actualValue: number) => {
  const subject = `Weather Alert for ${trigger.city}`;
  const text = `The ${trigger.parameter} in ${
    trigger.city
  } is now ${actualValue}, which is ${
    trigger.isAbove ? "above" : "below"
  } your set threshold of ${
    trigger[
      `trigger${
        trigger.parameter.charAt(0).toUpperCase() + trigger.parameter.slice(1)
      }`
    ]
  }.`;

  const emailSent = await sendEmail(trigger.email, subject, text);

  if (emailSent) {
    console.log(
      `Notification email sent to ${trigger.email} for ${trigger.city} ${trigger.parameter} alert`
    );

    // Update lastNotified
    await prisma.userNotification.update({
      where: { id: trigger.id },
      data: { lastNotified: new Date() },
    });
  } else {
    console.error(`Failed to send notification email to ${trigger.email}`);
  }
};

export const setupTrigger = async (
  email: string,
  city: string,
  parameter: string,
  triggerValue: number,
  isAbove: boolean
) => {
  const triggerData: any = {
    email,
    city,
    parameter,
    isAbove,
  };

  switch (parameter) {
    case "temp":
      triggerData.triggerTemp = triggerValue;
      break;
    case "humidity":
      triggerData.triggerHumidity = triggerValue;
      break;
    case "pressure":
      triggerData.triggerPressure = triggerValue;
      break;
    default:
      throw new Error("Invalid parameter");
  }

  return prisma.userNotification.create({
    data: triggerData,
  });
};
