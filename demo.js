const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Sử dụng Axios để thực hiện yêu cầu GET đến trang web
const shape = [
  "princess-cut",
  "emerald-cut",
  "asscher-cut",
  "cushion-cut",
  "marquise-cut",
  "radiant-cut",
  "oval-cut",
  "pear-cut",
  "heart-cut",
];
let k = [];
var url = "";
for (let j = 0.14; j < 5.0; j = j + 0.02) {
  for (let i = -1; i < shape.length; i++) {
    if (i >= 0) {
      url = `https://www.bluenile.com/diamond-search/?CaratFrom=${(
        j - 0.01
      ).toFixed(2)}&CaratTo=${j.toFixed(2)}&Color=K,J,I,H,G,F,E,D&Shape=${shape[i]
        }&Clarity=SI2,SI1,VS2,VS1,VVS2,VVS1,IF,FL&Cut=Good,Very+Good,Ideal,AstorIdeal`;
    } else {
      url = `https://www.bluenile.com/diamond-search/?CaratFrom=${(
        j - 0.01
      ).toFixed(2)}&CaratTo=${j.toFixed(2)
        }&Color=K,J,I,H,G,F,E,D&&Clarity=SI2,SI1,VS2,VS1,VVS2,VVS1,IF,FL&Cut=Good,Very+Good,Ideal,AstorIdeal`;
    }
  }
  axios
    .get(url)
    .then((response) => {
      // Dữ liệu HTML từ trang web nằm trong response.data
      const htmlData = response.data;

      // Sử dụng cheerio để phân tích dữ liệu HTML
      const $ = cheerio.load(htmlData);

      // Lấy thẻ div có id="data-page-container"
      const dataPageContainer = $("#data-page-container");

      // Lấy tất cả các thẻ a bên trong thẻ div
      const anchorTags = dataPageContainer.find("a");

      // In thông tin lấy được từ các thẻ a ra màn hình
      console.log(anchorTags.length);
      anchorTags.each((index, element) => {
        const href = $(element).attr("href");
        const text = $(element).text();
        fs.appendFile(
          "link.txt",
          JSON.stringify({ link: href, content: text }).toString() + "\n",
          (err) => {
            if (err) {
              console.error("Lỗi khi ghi vào tệp văn bản:", err);
            } else {
              console.log('Dữ liệu đã được ghi vào tệp văn bản "data.txt".');
            }
          }
        );
      });
      console.log(k.length);
    })
    .catch((error) => {
      console.error("Lỗi:", error);
    });
}