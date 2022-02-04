const getNetwork = (ip, mask) => {
  const arr_ip = ip.split('.')
  const arr_mask = mask.split('.')
  return arr_ip.map((x, i) => x & arr_mask[i]).join('.')
}


while (mask = readline()) {
  const ip1 = readline()
  const ip2 = readline()
  if ([mask, ip1, ip2].some(x => !/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(x))) {
    print(1);
  } else if (getNetwork(ip1, mask) === getNetwork(ip2, mask)) {
    print(0)
  } else {
    print(2)
  }
}