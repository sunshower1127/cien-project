import { isEmpty } from "@/lib/sw-toolkit/utils/utils";
import { ComponentType, ReactNode } from "react";

export default function Awaited<T>({
  query,
  render,
  renderLoading,
  renderError,
  renderEmpty,
  Component,
  LoadingComponent,
  ErrorComponent,
  EmptyComponent,
}: {
  query: { isLoading?: boolean; error?: Error | null; data?: T | null };
  render?: (data: T) => ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (error: Error) => ReactNode;
  renderEmpty?: () => ReactNode;
  Component?: ComponentType<{ data: T }>;
  LoadingComponent?: ComponentType;
  ErrorComponent?: ComponentType<{ error: Error }>;
  EmptyComponent?: ComponentType;
}) {
  if (query.error) {
    if (renderError) return renderError(query.error);
    if (ErrorComponent) return <ErrorComponent error={query.error} />;
  }
  if (query.isLoading) {
    if (renderLoading) return renderLoading();
    if (LoadingComponent) return <LoadingComponent />;
  }
  if (isEmpty(query.data)) {
    if (renderEmpty) return renderEmpty();
    if (EmptyComponent) return <EmptyComponent />;
  } else {
    if (render) return render(query.data);
    if (Component) return <Component data={query.data} />;
  }
}
