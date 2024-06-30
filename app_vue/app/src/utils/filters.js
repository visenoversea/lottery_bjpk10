const filtersZhangfu = (value, fixed) => {
  if(value >= 0) {
    return '+' + (value * 100).toFixed(fixed) + '%'
  }else {
    return (value * 100).toFixed(fixed) + '%'
  }
}

export default {
  filtersZhangfu,
}