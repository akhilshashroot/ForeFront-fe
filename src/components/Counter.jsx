import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Input } from "reactstrap";

const Counter = ({
  ivalue,
  onChange,
  step,
  incrementDisable,
  decrementDisable,
}) => {
  const [formval, setformVal] = useState(ivalue === undefined ? 0 : ivalue);

  useEffect(() => {
    onChange(formval);
  }, [formval]);

  return (
    <>
      <ButtonGroup>
        <Button
          color="danger"
          onClick={() => {
            setformVal(formval - step);
          }}
          disabled={decrementDisable}
        >
          -
        </Button>
        <Button color="light" className="p-0" style={{ width: "10%" }}>
          <Input className="text-center" type="number" value={formval}></Input>
        </Button>
        <Button
          color="success"
          onClick={() => {
            setformVal(formval + step);
          }}
          disabled={incrementDisable}
        >
          +
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Counter;
