// TODO One day will move this code into a module

const url = require("url")
    , qs = require("qs")

module.exports = (input, opts) => {
  const parsed = url.parse(input, true);

  const checkers = [
        [
            parsed => {
              if (parsed.hostname.includes("youtube.com")) {
                return parsed.query.v
              }

              if (parsed.hostname === "youtu.be") {
                return url.pathname.split("/")[1]
              }
            }
          , (id, opts) => {
                return `<iframe src="https://www.youtube.com/embed/${id}${opts.qs}" frameborder="0" allowfullscreen></iframe>`;
            }
        ]
      , [
            parsed => {
                return parsed.hostname === "vimeo.com"
                     ? parsed.pathname.split("/")[1]
                     : null
            }
          , (id, opts) => {
                return `<iframe src="https://player.vimeo.com/video/${id}${opts.qs}" frameborder="0" allowfullscreen></iframe>`;
            }
        ]
    ];

    for (let i = 0; i < checkers.length; ++i) {
        const check = checkers[i];
        const id = check[0](parsed);
        if (id) {
            let qsV = "";
            if (opts && 'query' in opts) {
                qsV = "?" + qs.stringify(opts.query)
            }
            return check[1](id, { qs: qsV });
        }
    }

    return null;
};
