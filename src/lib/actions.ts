"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Company Actions
export async function createCompany(formData: FormData) {
  const name = formData.get("name") as string;
  const industry = formData.get("industry") as string;
  const website = formData.get("website") as string;

  await prisma.company.create({
    data: {
      name,
      industry: industry || null,
      website: website || null,
    },
  });

  revalidatePath("/companies");
  redirect("/companies");
}

export async function updateCompany(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const industry = formData.get("industry") as string;
  const website = formData.get("website") as string;

  await prisma.company.update({
    where: { id },
    data: {
      name,
      industry: industry || null,
      website: website || null,
    },
  });

  revalidatePath("/companies");
  redirect("/companies");
}

export async function deleteCompany(id: string) {
  await prisma.company.delete({
    where: { id },
  });

  revalidatePath("/companies");
}

// Contact Actions
export async function createContact(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const companyId = formData.get("companyId") as string;

  await prisma.contact.create({
    data: {
      firstName,
      lastName,
      email: email || null,
      phone: phone || null,
      companyId: companyId || null,
    },
  });

  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function updateContact(id: string, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const companyId = formData.get("companyId") as string;

  await prisma.contact.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email: email || null,
      phone: phone || null,
      companyId: companyId || null,
    },
  });

  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({
    where: { id },
  });

  revalidatePath("/contacts");
}
