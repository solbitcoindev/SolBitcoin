import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageVariant = "success" | "warning" | "error" | "info";

interface BaseSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageModalProps extends BaseSiteModalProps {
  variant?: MessageVariant;
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export type SiteModalProps = ({ type: "message" } & MessageModalProps);

export function SiteModal(props: SiteModalProps) {
  switch (props.type) {
    case "message":
      return <MessageModal {...props} />;
    default:
      return null;
  }
}

function MessageModal({ isOpen, onClose, variant = "info", title, description, confirmText, onConfirm }: MessageModalProps) {
  const Icon = variant === "success" ? CheckCircle : variant === "warning" ? AlertTriangle : variant === "error" ? AlertCircle : null;
  const iconColor = variant === "success" ? "text-green-500" : variant === "warning" ? "text-yellow-500" : variant === "error" ? "text-red-500" : "text-primary";
  const headerText = title ?? (variant === "success" ? "Success" : variant === "warning" ? "Warning" : variant === "error" ? "Error" : "Info");
  const descriptionText = description ?? "";

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
            {headerText}
          </DialogTitle>
          {descriptionText && (
            <DialogDescription>
              {descriptionText}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {confirmText && (
            <Button onClick={handleConfirm}>{confirmText}</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type SubscribeResult = {
  variant: MessageVariant;
  title: string;
  description: string;
};

export async function subscribeEmail(email: string): Promise<SubscribeResult> {
  try {
    const apiUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "https://email-handler-84h0.onrender.com";
    if (!apiUrl) {
      return {
        variant: "error",
        title: "Configuration error",
        description: "API URL is not defined. Check your .env file.",
      };
    }

    const response = await fetch(`${apiUrl}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => undefined);

    if (response.ok) {
      return {
        variant: "success",
        title: "Subscribed",
        description: "You have been added to the notification list!",
      };
    }

    if (response.status === 409) {
      return {
        variant: "warning",
        title: "Already subscribed",
        description: "This email is already on the list.",
      };
    }

    return {
      variant: "error",
      title: "Request failed",
      description: (data as any)?.error ? String((data as any).error) : "Unknown error",
    };
  } catch (_err) {
    return {
      variant: "error",
      title: "Network error",
      description: "Failed to send email. Please try again later.",
    };
  }
}

export function isLikelyValidEmailFormat(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function validateEmailForSubscribe(email: string): { ok: boolean; uiError?: string; toast?: SubscribeResult } {
  const hasNonAscii = /[^\x00-\x7F]/.test(email);
  if (!email || !isLikelyValidEmailFormat(email) || hasNonAscii) {
    return {
      ok: false,
      uiError: "Incorrect email",
      toast: {
        variant: "error",
        title: "Validation error",
        description: hasNonAscii
          ? "Email contains Cyrillic/non-ASCII characters."
          : "Please enter a valid email.",
      },
    };
  }
  return { ok: true };
}

export default SiteModal;


