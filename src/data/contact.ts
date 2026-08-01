export const projectContact = {
  name: "Felipe Rodrigues",
  phoneDisplay: "(51) 99639-0614",
  phoneE164: "5551996390614",
  get whatsappUrl() {
    const text = encodeURIComponent(
      "Olá Felipe! Vi o projeto História São Leopoldo e gostaria de conversar.",
    );
    return `https://wa.me/${this.phoneE164}?text=${text}`;
  },
  get whatsappSponsorUrl() {
    const text = encodeURIComponent(
      "Olá Felipe! Tenho interesse em patrocinar o História São Leopoldo.",
    );
    return `https://wa.me/${this.phoneE164}?text=${text}`;
  },
  get whatsappContributeUrl() {
    const text = encodeURIComponent(
      "Olá Felipe! Quero contribuir com fotos para o História São Leopoldo.",
    );
    return `https://wa.me/${this.phoneE164}?text=${text}`;
  },
} as const;
