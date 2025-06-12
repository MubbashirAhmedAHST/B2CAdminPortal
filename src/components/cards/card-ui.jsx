"use client";
export default function CardUI({ children, cardClassName, cardBodyClassName,  }) {
  return (
    <div className={`card m-3 ${cardClassName}`}>
      <div className={`card-body ${cardBodyClassName}`}>{children}</div>
    </div>
  );
}
