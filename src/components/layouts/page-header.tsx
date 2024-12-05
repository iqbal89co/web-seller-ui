import React from "react";

type Props = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-6 border-b pb-4">
      <h2 className="font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-foreground/50">{description}</p>
      )}
    </div>
  );
}
