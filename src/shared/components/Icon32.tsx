import React from "react";

type Icon32Props = {
  icon: React.ReactElement;
};

export function Icon32({ icon }: Icon32Props) {
  return React.cloneElement(icon, {
    width: 32,
    height: 32,
  });
}