/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import dropDownArrow from "../../../../../assets/icons/caret-down-tests.svg";

import dropDownArrowUp from "../../../../../assets/icons/caret-up-tests.svg";

import RestTestSnippets from "./RestTestSnippets";

export default function RestTestSnippetsContainer(props) {
  console.log("propsssss=>", props);
  const { setShowTests, testContent, setNewTestContent } = props;
  const [showSnippets, setShowSnippets] = useState(false);

  const handleShowSnippets = () => {
    setShowSnippets(!showSnippets);
  };
  return (
    <div>
      <div
        className="is-rest-invert show-hide-tests cards-dropdown minimize-card is-flex is-align-items-center is-justify-content-center"
        onClick={handleShowSnippets}
      >
        {showSnippets === true && (
          <>
            <span>Test Snippets</span>
            <span className="icon is-medium is-align-self-center show-hide-tests-icon">
              <img
                alt=""
                src={dropDownArrowUp}
                className="is-awesome-icon"
                aria-hidden="false"
              />
            </span>
          </>
        )}

        {showSnippets === false && (
          <>
            <span>Test Snippets</span>
            <span className="icon is-medium is-align-self-center show-hide-tests-icon">
              <img
                alt=""
                src={dropDownArrow}
                className="is-awesome-icon"
                aria-hidden="false"
              />
            </span>
          </>
        )}
      </div>

      {showSnippets === true && (
        <div id="test-snippets">
          <RestTestSnippets
            testContent={testContent}
            setNewTestContent={setNewTestContent}
            setShowTests={setShowTests}
          />
        </div>
      )}
    </div>
  );
}
