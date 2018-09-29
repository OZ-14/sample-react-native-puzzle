const Style = {
  w: num => ({ width: num }),
  h: num => ({ height: num }),
  m: num => ({ margin: num }),
  mt: num => ({ marginTop: num }),
  mr: num => ({ marginRight: num }),
  mb: num => ({ marginBottom: num }),
  ml: num => ({ marginLeft: num }),
  mh: num => ({ marginHorizontal: num }),
  mv: num => ({ marginVertical: num }),
  p: num => ({ padding: num }),
  pt: num => ({ paddingTop: num }),
  pr: num => ({ paddingRight: num }),
  pb: num => ({ paddingBottom: num }),
  pl: num => ({ paddingLeft: num }),
  ph: num => ({ paddingHorizontal: num }),
  pv: num => ({ paddingVertical: num }),
  col: str => ({ color: str }),
  bg: str => ({ backgroundColor: str }),
};

export default Style
