"use client";

import Link from "next/link";
import { useState } from "react";
import { MoveUp, MoveDown } from "lucide-react";

export default function OrderButton({ UrlParams }: { UrlParams: string }) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);

  const getLabel = (key: string): string => {
    switch (key) {
      case "userId":
        return "ID utilisateur";
      case "shippingName":
        return "Nom";
      case "shippingSurname":
        return "Prénom";
      case "shippingEmail":
        return "E-Mail";
      case "status":
        return "Status";
      default:
        return key;
    }
  };

  return (
    <Link
      href={
        !isClick
          ? `/admin/orders?sortBy=${UrlParams}&order=asc`
          : `/admin/orders?sortBy=${UrlParams}&order=desc`
      }
      onClick={() => {
        setIsClick(!isClick);
        setIsSort(true);
      }}
    >
      <div className="flex">
        <span>{`${getLabel(UrlParams)} `}</span>
        {isSort && (!isClick ? <MoveDown size={10} /> : <MoveUp size={10} />)}
      </div>
    </Link>
  );
}
