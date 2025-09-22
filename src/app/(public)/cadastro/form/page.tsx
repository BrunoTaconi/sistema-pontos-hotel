"use client";

import { Suspense } from "react";
import { CadastroFormContent } from "@/components/cadastro/CadastroContent";

export default function CadastroForm() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CadastroFormContent />
    </Suspense>
  );
}