import React, { useState } from "react";
import ReactDOM from "react-dom";
import { InputNumber, Button, Checkbox, Row, Col } from "antd";
import "antd/dist/antd.css";
import {
  FaRunning,
  FaBrain,
  FaBolt,
  FaAsterisk,
  FaHeart
} from "react-icons/fa";
import { GiMuscleUp } from "react-icons/gi";
import maps from "./maps.json";

function isOdd(num) {
  return num % 2 === 1;
}

function between(min, max, v) {
  if ((v >= min) & (v <= max)) {
    return true;
  } else {
    return false;
  }
}

const App = props => {
  const [brawn, setBrawn] = useState(2);
  const [agility, setAgility] = useState(2);
  const [mental, setMental] = useState(2);
  const [steel, setSteel] = useState(2);
  const [luck, setLuck] = useState(0);

  const handleBrawn = value => {
    setBrawn(value);
  };
  const handleAgility = value => {
    setAgility(value);
  };
  const handleMental = value => {
    setMental(value);
  };
  const handleSteel = value => {
    setSteel(value);
  };
  const handleLuck = value => {
    setLuck(value);
  };

  const mapper = (map, value) => {
    if (between(2, 18, value)) {
      if (value) return map[value];
    } else {
      return (
        <span style={{ color: "red" }}>
          value of {value} needs to be between 2 - 18
        </span>
      );
    }
  };

  ////////////////////////////////

  // const encumbranceCalc = () => {
  //   const patternChange = 13;
  //   if (brawn < patternChange) {
  //     return 4 + 2 * brawn;
  //   } else {
  //     return brawn + 30 - patternChange;
  //   }
  // };

  return (
    <Row
      type="flex"
      gutter={[50, 0]}
      align="middle"
      justify="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Col>
        <Row gutter={[10, 10]} justify="center" type="flex">
          <Inputer name="Brawn" onChange={handleBrawn} value={brawn}>
            <GiMuscleUp style={{ color: "#c0392b" }} />
          </Inputer>
          <Inputer name="Agility" onChange={handleAgility} value={agility}>
            <FaRunning style={{ color: "#2ecc71" }} />
          </Inputer>
          <Inputer name="Mental" onChange={handleMental} value={mental}>
            <FaBrain style={{ color: "#3498db" }} />
          </Inputer>
          <Inputer name="Steel" onChange={handleSteel} value={steel}>
            <FaBolt style={{ color: "#9b59b6" }} />
          </Inputer>
          <Inputer name="Luck" min={0} onChange={handleLuck} value={luck}>
            <FaHeart style={{ color: "#e74c3c" }} />
          </Inputer>
        </Row>
      </Col>
      <Col>
        <Stat name="Encumbrance" value={mapper(maps.encumberance, brawn)} />
        <Stat name="Melee Damage" value={mapper(maps.melee, brawn)} />
        <Stat name="Movement" value={mapper(maps.movement, agility)} />
        <Stat name="Reflex" value={agility + mental} />
        <Stat name="Chrome" value={mapper(maps.chrome, steel)} />
      </Col>
    </Row>
  );
};

const Stat = props => {
  return (
    <div>
      <strong>{props.name} : </strong>
      <span>{props.value}</span>
    </div>
  );
};

const Inputer = props => {
  return (
    <Col>
      <Row gutter={[10, 10]} align="middle" justify="center" type="flex">
        <Col>
          <span>{props.children}</span>
        </Col>
        <Col>
          <InputNumber
            min={props.min}
            max={18}
            value={props.value}
            size="large"
            step={1}
            onChange={props.onChange}
          />
        </Col>
        <Col>
          <Checkbox />
        </Col>
      </Row>
    </Col>
  );
};

Inputer.defaultProps = {
  min: 2
};

ReactDOM.render(<App />, document.getElementById("root"));
