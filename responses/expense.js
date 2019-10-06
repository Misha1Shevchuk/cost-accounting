const category = require("../helpers/categoriesEnum");

const selectCategory = {
  text: "Select category",
  quick_replies: [
    {
      content_type: "text",
      title: category.TRANSPORT,
      payload: "<TRANSPORT>"
    },
    {
      content_type: "text",
      title: category.FOOD,
      payload: "<FOOD>"
    },
    {
      content_type: "text",
      title: category.ENTERTAINMENT,
      payload: "<ENTERTAINMENT>"
    },
    {
      content_type: "text",
      title: category.BEAUTY_AND_HEALTH,
      payload: "<BEAUTY_AND_HEALTH>"
    },
    {
      content_type: "text",
      title: category.CLOTHES,
      payload: "<CLOTHES>"
    },
    {
      content_type: "text",
      title: category.UTILITES,
      payload: "<UTILITES>"
    },
    {
      content_type: "text",
      title: category.OTHER,
      payload: "<OTHER>"
    }
  ]
};

const enterAmount = {
  text: "Type or select amount:",
  quick_replies: [
    {
      content_type: "text",
      title: "50",
      payload: "<AMOUNT_50>"
    },
    {
      content_type: "text",
      title: "100",
      payload: "<AMOUNT_100>"
    },
    {
      content_type: "text",
      title: "200",
      payload: "<AMOUNT_200>"
    },
    {
      content_type: "text",
      title: "Change category",
      payload: "<GO_BACK_TO_CATEGORIES>"
    }
  ]
};

const enterDescription = {
  text: "Write description: ",
  quick_replies: [
    {
      content_type: "text",
      title: "Skip",
      payload: "<SKIP_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<GO_BACK_TO_AMOUNT>"
    },
    {
      content_type: "text",
      title: "Change category",
      payload: "<GO_BACK_TO_CATEGORIES>"
    }
  ]
};

const saveSpend = {
  text: "Save expense?",
  quick_replies: [
    {
      content_type: "text",
      title: "Save it",
      payload: "<SAVE_COST>"
    },
    {
      content_type: "text",
      title: "Change description",
      payload: "<GO_BACK_TO_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<GO_BACK_TO_AMOUNT>"
    },
    {
      content_type: "text",
      title: "Change category",
      payload: "<GO_BACK_TO_CATEGORIES>"
    }
  ]
};

module.exports = { saveSpend, enterAmount, enterDescription, selectCategory };
