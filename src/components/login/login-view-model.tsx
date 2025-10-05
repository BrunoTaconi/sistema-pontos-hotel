"use client";

import { LoginView } from "./login-view";
import { useLoginViewModel } from "./use-login-model";

export function LoginViewModel() {
  const props = useLoginViewModel();

  return <LoginView {...props} />;
}
