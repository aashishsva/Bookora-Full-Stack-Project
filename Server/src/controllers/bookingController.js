import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPublicBooking = async (req, res) => {
  try {
    const { customer, service, date, time, userId } = req.body;

    const booking = await Booking.create({
      customer,
      service,
      date,
      time,
      user: userId,
      status: "Pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingStats = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user });

    const total = bookings.length;
    const pending = bookings.filter(
      (item) => item.status === "Pending"
    ).length;

    const completed = bookings.filter(
      (item) => item.status === "Completed"
    ).length;

    const todayDate = new Date().toISOString().split("T")[0];

    const today = bookings.filter(
      (item) => item.date === todayDate
    ).length;

    res.json({
      total,
      pending,
      completed,
      today,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = req.body.status || booking.status;

    const updated = await booking.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    const map = {};

    bookings.forEach((item) => {
      const name = item.customer.trim();

      if (!map[name]) {
        map[name] = {
          name,
          visits: 1,
          service: item.service,
          lastDate: item.date,
        };
      } else {
        map[name].visits += 1;
      }
    });

    res.json(Object.values(map));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};