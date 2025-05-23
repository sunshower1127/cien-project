import { HTMLProps } from "@/lib/sw-toolkit/types/html";
import { cn } from "@/lib/sw-toolkit/utils/style";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentType, ReactNode } from "react";
import Awaited from "../../lib/sw-toolkit/components/Awaited";

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
      className={cn(
        "action-md bg-cien-neon-blue-500 inline-flex h-[54px] w-[248px] items-center justify-center rounded-full text-center text-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const Loading = ({ size = 24, className, ...props }: HTMLProps<"svg"> & { size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin self-center", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

function Error({ error }: { error: Error }) {
  return <Text className={"text-center text-red-500"}>{error.message}</Text>;
}

function Empty() {
  return <Text className="text-center">데이터가 없습니다</Text>;
}

function Data<T>({
  query,
  render,
  renderLoading,
  renderError,
  renderEmpty,
  Component,
  LoadingComponent = Loading,
  ErrorComponent = Error,
  EmptyComponent = Empty,
}: {
  query: { isLoading?: boolean; error?: Error | null; data?: T | null };
  render?: (data: T) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error: Error) => ReactNode;
  renderEmpty?: () => ReactNode;
  Component?: ComponentType<{ data: T }>;
  LoadingComponent?: ComponentType<HTMLProps<"svg">>;
  ErrorComponent?: ComponentType<{ error: Error }>;
  EmptyComponent?: ComponentType;
}) {
  return (
    <Awaited
      query={query}
      render={render}
      renderLoading={renderLoading}
      renderError={renderError}
      renderEmpty={renderEmpty}
      Component={Component}
      LoadingComponent={LoadingComponent}
      ErrorComponent={ErrorComponent}
      EmptyComponent={EmptyComponent}
    />
  );
}

// Composite Component
const Card = Object.assign(Container, {
  Title,
  SubTitle,
  SubText,
  Text,
  Section,
  Label,
  Data,
});

export default Card;
