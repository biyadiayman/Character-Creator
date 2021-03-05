const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

//hairType:
//	1 -> Long
//	2 -> Short
//	3 -> Curly
//	4 -> Boy
//	5 -> Buzz
//	6 -> Bald

//glassesType:
// 0 -> none
// 1 -> round
// 2 -> square

//hairColor:
// 1 -> blond
// 2 -> brown
// 3 -> black
// 4 -> red

//eyeColor:
// 1 -> blue
// 2 -> brown
// 3 -> green
// 4 -> grey

//skinColor:
// 1 -> light
// 2 -> dark
// 3 -> darkest
// 4 -> lightest

const generate = async (
  isWearingDress,
  glassesType,
  hairType,
  hairColor,
  eyesColor,
  skinColor
) => {
  const width = 1000;
  const height = 2000;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // SkinTone
  let skinToneNum = skinColor;
  let skinToneName =
    path.join(__dirname + "/assets/skinTone0") + skinToneNum + ".png";
  let skinTone = await loadImage(skinToneName);

  // EyeColor
  let eyeColorNum = eyesColor;
  let eyeColorName =
    path.join(__dirname + "/assets/eyeColor0") + eyeColorNum + ".png";
  let eyeColor = await loadImage(eyeColorName);

  // HAIR // Same Color
  // EyeBrows
  let eyeBrowsNum = hairColor;
  let eyeBrowsName =
    path.join(__dirname + "/assets/eyeBrows") + eyeBrowsNum + ".png";
  let eyeBrows = await loadImage(eyeBrowsName);

  // HairFront
  let hairFrontName;
  if (hairType == 1) {
    hairFrontName =
      path.join(__dirname + "/assets/hairF0") + eyeBrowsNum + ".png";
  } else if (hairType == 2) {
    hairFrontName =
      path.join(__dirname + "/assets/hairF0") + eyeBrowsNum + ".png";
  } else if (hairType == 3) {
    hairFrontName =
      path.join(__dirname + "/assets/hairFCurly0") + eyeBrowsNum + ".png";
  } else if (hairType == 4) {
    hairFrontName =
      path.join(__dirname + "/assets/hairF0") + eyeBrowsNum + ".png";
  } else if (hairType == 5) {
    hairFrontName =
      path.join(__dirname + "/assets/hairFBuzz0") + eyeBrowsNum + ".png";
  } else if (hairType == 6) {
    hairFrontName = path.join(__dirname + "/assets/hairF13.png");
  }
  let hairFront = await loadImage(hairFrontName);

  // HairBack

  let hairBackName;

  if (hairType == 1) {
    hairBackName =
      path.join(__dirname + "/assets/hairBLong_0") + eyeBrowsNum + ".png";
  } else if (hairType == 2) {
    hairBackName =
      path.join(__dirname + "/assets/hairBShort_0") + eyeBrowsNum + ".png";
  } else if (hairType == 3) {
    hairBackName =
      path.join(__dirname + "/assets/hairBCurly_0") + eyeBrowsNum + ".png";
  } else if (hairType == 4) {
    hairBackName = path.join(__dirname + "/assets/hairF13.png");
  } else if (hairType == 5) {
    hairBackName = path.join(__dirname + "/assets/hairF13.png");
  } else if (hairType == 6) {
    hairBackName = path.join(__dirname + "/assets/hairF13.png");
  }
  let hairBack = await loadImage(hairBackName);

  // bodyType
  let bodyTypeNum = Math.floor(Math.random() * 4) + 1;
  let bodyTypeName =
    (isWearingDress
      ? path.join(__dirname + "/assets/BodyD")
      : path.join(__dirname + "/assets/Body")) +
    skinToneNum +
    ".png";
  let bodyType = await loadImage(bodyTypeName);

  // glasses

  let glassesNum = glassesType;
  let glassesName;
  if (glassesType == 0) {
    glassesName = path.join(__dirname + "/assets/hairF13.png");
  } else {
    glassesName =
      path.join(__dirname + "/assets/Glasses0") + glassesNum + ".png";
  }
  let glasses = await loadImage(glassesName);

  buildAvatar();

  function buildAvatar() {
    // hairBack
    context.drawImage(hairBack, (1000 - hairBack.width) / 2, 50);
    // skintone
    context.drawImage(skinTone, (1000 - skinTone.width) / 2, 50);
    // eyeColor
    context.drawImage(eyeColor, (1000 - eyeColor.width) / 2, 50);
    // eyeBrows
    context.drawImage(eyeBrows, (1000 - eyeBrows.width) / 2, 50);
    // hairFront
    context.drawImage(hairFront, (1000 - hairFront.width) / 2, 50);
    // bodyType
    context.drawImage(bodyType, (25 - bodyType.width) / 2, 0, 2000, 2000);
    // glasses
    context.drawImage(glasses, (1000 - glasses.width) / 2, 50);
  }

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(__dirname + "/image.png"), buffer);
};

/*generate(
	isWearingDress=false,
	glassesType=1,
	hairType=5,
	hairColor=3,
	eyesColor=1,
	skinColor=3
);*/

module.exports = { generate };
