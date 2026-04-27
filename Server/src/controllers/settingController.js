import Setting from "../models/Setting.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      user: req.user,
    });

    if (!settings) {
      settings = await Setting.create({
        user: req.user,
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      user: req.user,
    });

    if (!settings) {
      settings = await Setting.create({
        ...req.body,
        user: req.user,
      });
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};