module.exports = {
  extends: "airbnb",
  rules: {
    'arrow-parens': [ 'error', 'as-needed' ],
    "comma-dangle": [ 'error', 'never' ],
    "react/jsx-filename-extension": [ 1, { "extensions": [".js", ".jsx"] } ],
    "react/prop-types": [ 0 ],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  }
};

// NOTE: figure out why i can't specify prop types
// turning off some of the jsx-a11y rules for now until i figure out their uses
