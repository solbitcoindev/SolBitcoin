import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const variant = (props as any).variant as string | undefined
        const Icon = variant === "success" ? CheckCircle : variant === "warning" ? AlertTriangle : variant === "error" ? AlertCircle : null
        const iconColor = variant === "success" ? "text-green-500" : variant === "warning" ? "text-yellow-500" : variant === "error" ? "text-red-500" : "text-primary"
        const progressColor = variant === "success" ? "bg-green-500" : variant === "warning" ? "bg-yellow-500" : variant === "error" ? "bg-red-500" : "bg-foreground/60"
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex items-start gap-2">
                {Icon && <Icon className={cn("mt-0.5 h-5 w-5", iconColor)} />}
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            {/* Абсолютная полоса прогресса внутри внутренних отступов тоста */}
            <div className="pointer-events-none absolute left-0 right-5 bottom-2 h-1 bg-transparent">
              <div className={cn("h-full w-full animate-toast-progress", progressColor)} />
            </div>
            <ToastClose className="hidden" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
