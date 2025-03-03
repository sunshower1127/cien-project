import { cn } from "@/lib/utils";
import { HTMLProps } from "@/types/html";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva("flex flex-col gap-[16px] rounded-[20px] p-[20px] overflow-hidden", {
  variants: {
    alignment: {
      left: "",
      center: "items-center text-center",
    },
    size: {
      sm: "w-(--sm-card-width)",
      md: "w-[calc(var(--sm-width)*2 + var(--card-gap))]",
      lg: "w-(--lg-card-width)",
    },
    theme: {
      light: "bg-white text-black",
      dark: "bg-cien-blue-100 text-white",
    },
  },
  defaultVariants: {
    alignment: "left",
    size: "sm",
    theme: "light",
  },
});

function Container({ className, alignment, size, theme, ...props }: HTMLProps<"div"> & VariantProps<typeof cardVariants>) {
  return <article className={cn(cardVariants({ alignment, size, theme, className }))} {...props} />;
}

function Section({ className, ...props }: HTMLProps<"section">) {
  return <section className={cn("flex flex-col gap-[8px]", className)} {...props} />;
}

function Title({ className, ...props }: HTMLProps<"h1">) {
  return <h1 className={cn("title-lg", className)} {...props} />;
}

function SubTitle({ className, ...props }: HTMLProps<"h2">) {
  return <h2 className={cn("title-md", className)} {...props} />;
}

function Text({ className, ...props }: HTMLProps<"p">) {
  return <p className={cn("action-md", className)} {...props} />;
}

function SubText({ className, ...props }: HTMLProps<"p">) {
  return <p data-slot="card-description" className={cn("action-sm", className)} {...props} />;
}

function Label({ className, children, ...props }: HTMLProps<"div">) {
  return (
    <div
      className={cn("action-md bg-cien-neon-blue-500 inline-flex h-[54px] w-[228px] items-center justify-center rounded-full text-center text-white", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// 복합 컴포넌트 구성
const Card = Object.assign(Container, {
  Title,
  SubTitle,
  SubText,
  Text,
  Section,
  Label,
});

export default Card;
