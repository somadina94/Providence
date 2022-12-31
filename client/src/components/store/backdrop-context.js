import React, { useState } from "react";

const BackdropContext = React.createContext({
  showLocTransfer: false,
  showIntTransfer: false,
  showChangePin: false,
  showSuccess: false,
  onShowLocTransfer: () => {},
  onShowIntTransfer: () => {},
  onShowChangePin: () => {},
  onShowSuccess: () => {},
  onHideLocTransfer: () => {},
  onHideIntTransfer: () => {},
  onHideChangePin: () => {},
  onHideSuccess: () => {},
});

export const BackdropContextProvider = (props) => {
  const [showLocTransfer, setShowLocTransfer] = useState(false);
  const [showIntTransfer, setShowIntTransfer] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showIntTransferHandler = () => {
    setShowIntTransfer(true);
  };

  const hideIntTransferHandler = () => {
    setShowIntTransfer(false);
  };

  const showLocTransferHandler = () => {
    setShowLocTransfer(true);
  };
  const hideLocTransferHandler = () => {
    setShowLocTransfer(false);
  };

  const showChangePinHandler = () => {
    setShowChangePin(true);
  };
  const hideChangePinHandler = () => {
    setShowChangePin(false);
  };
  const showSuccessHandler = () => {
    setShowSuccess(true);
  };
  const hideSuccessHandler = () => {
    setShowSuccess(false);
  };

  return (
    <BackdropContext.Provider
      value={{
        showLocTransfer,
        showIntTransfer,
        showChangePin,
        showSuccess,
        onShowLocTransfer: showLocTransferHandler,
        onShowIntTransfer: showIntTransferHandler,
        onShowChangePin: showChangePinHandler,
        onShowSuccess: showSuccessHandler,
        onHideLocTransfer: hideLocTransferHandler,
        onHideIntTransfer: hideIntTransferHandler,
        onHideChangePin: hideChangePinHandler,
        onHideSuccess: hideSuccessHandler,
      }}
    >
      {props.children}
    </BackdropContext.Provider>
  );
};

export default BackdropContext;
