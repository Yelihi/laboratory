"use client";

import React from "react";

const OrderDetails = ({ params, searchParams }) => {
  const { id } = params;
  const { hello } = searchParams;

  return <div>{id}</div>;
};

export default OrderDetails;
