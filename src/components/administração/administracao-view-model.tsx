"use client";

import { AdministracaoView } from "./administracao-view";
import { useAdministracaoViewModel } from "./use-administracao-model";

export function AdministracaoViewModel() {
  const props = useAdministracaoViewModel();

  return <AdministracaoView {...props} />;
}
