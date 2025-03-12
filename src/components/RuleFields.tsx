import React from "react";
import { Rule } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// Import styles
import "../styles/ruleFields.css";
import "../styles/buttons.css";

interface RuleFieldsProps {
  rules: Rule[];
  onChange: (updatedRules: Rule[]) => void;
}

const RuleFields: React.FC<RuleFieldsProps> = ({ rules, onChange }) => {
  const handleRuleChange = (index: number, key: keyof Rule, value: string) => {
    const newRules = [...rules];

    if (key === "divisor") {
      newRules[index].divisor = parseInt(value, 10) || 0;
    } else if (key === "replacementText") {
      newRules[index].replacementText = value;
    }

    onChange(newRules);
  };

  const addRule = () => {
    onChange([...rules, { divisor: 0, replacementText: "" }]);
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    onChange(newRules);
  };

  return (
    <div className="rule-fields-container fade-in">
      <h4 className="rule-title">Custom Rules</h4>

      {rules.map((rule, idx) => (
        <div key={idx} className="rule-row">
          <input
            type="number"
            placeholder="Divisor"
            value={rule.divisor}
            onChange={(e) => handleRuleChange(idx, "divisor", e.target.value)}
            className="rule-input"
          />
          <input
            type="text"
            placeholder="Replacement Text"
            value={rule.replacementText}
            onChange={(e) =>
              handleRuleChange(idx, "replacementText", e.target.value)
            }
            className="rule-input"
          />
          <button type="button" className="btn-remove" onClick={() => removeRule(idx)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}

      <button type="button" className="btn-add-rule" onClick={addRule}>
        <FontAwesomeIcon icon={faPlus} /> Add Rule
      </button>
    </div>
  );
};

export default RuleFields;