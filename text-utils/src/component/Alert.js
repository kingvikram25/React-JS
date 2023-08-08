import React from "react";

export default function Alert(alerts) {
  console.log(alerts);
  alerts = alerts.alert;
  const capitaliz = (word) => {
    const letter = word.toLowerCase();
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  };

  return (
    alerts && (
      <div className="alert alert-success" role="alert">
        <strong>{capitaliz(alerts.msg)} </strong>: {alerts.type}
      </div>
    )
  );
}
