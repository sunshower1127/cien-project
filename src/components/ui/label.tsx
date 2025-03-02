import { cn } from "@/lib/utils";

export default function Label({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("action-md inline-flex h-[54px] w-[228px] items-center justify-center rounded-full bg-(--cien-neon-blue-500) text-center text-white", className)}
      {...props}
    >
      {children}
    </div>
  );
}
