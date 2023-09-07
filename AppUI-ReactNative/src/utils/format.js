const formatDate = (date) => {
  date = new Date(date);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

const formatNumber = (num = 1000) => {
  let abc = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
  return abc;
};

const totalMovieMoney = (seatSelected) => {
  const seatVIP = ["D", "E", "F", "G", "H", "I", "J"];
  let total = 0;
  seatSelected.map((item) => {
    let row = item.seat.slice(0, 1);
    if (seatVIP.includes(row)) {
      total += 90000;
    } else if (row === "K") {
      total += 120000;
    } else {
      total += 75000;
    }
  });
  return total;
};
export { formatDate, formatNumber, totalMovieMoney };
