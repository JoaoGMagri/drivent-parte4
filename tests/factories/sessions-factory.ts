import { Session } from "@prisma/client";
import { prisma } from "@/config";

export async function createSession(token: string, userId: number): Promise<Session> {
  return prisma.session.create({
    data: {
      token: token,
      userId,
    },
  });
}
