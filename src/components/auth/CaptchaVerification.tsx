import { RefObject } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface CaptchaVerificationProps {
  captchaRef: RefObject<HCaptcha>;
  onVerify: (token: string) => void;
  onExpire: () => void;
}

const siteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY;

export function CaptchaVerification({
  captchaRef,
  onVerify,
  onExpire,
}: CaptchaVerificationProps) {
  return (
    <div className="flex justify-center my-4">
      <HCaptcha
        sitekey={siteKey}
        onVerify={onVerify}
        onExpire={onExpire}
        ref={captchaRef}
      />
    </div>
  );
}
