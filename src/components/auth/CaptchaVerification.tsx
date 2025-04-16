import { RefObject } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface CaptchaVerificationProps {
  captchaRef: RefObject<HCaptcha>;
  onVerify: (token: string) => void;
  onExpire: () => void;
}

export function CaptchaVerification({
  captchaRef,
  onVerify,
  onExpire,
}: CaptchaVerificationProps) {
  return (
    <div className="flex justify-center my-4">
      <HCaptcha
        sitekey="dc30e98c-779a-4070-ae06-4c18aa2eca20"
        onVerify={onVerify}
        onExpire={onExpire}
        ref={captchaRef}
      />
    </div>
  );
}
