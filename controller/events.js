const Event = require("../models/Event");

const getEvents = async(req, res) => {

    // ? get all events
    // const events = await Event.find().populate('user', 'name');

    // ? get only user's events
    const events = await Event.find({ user: req.uid }).populate('user', 'name');
    res.json({
        ok: true,
        events
    })

}

const createEvents = async(req, res) => {

    const event = new Event(req.body)
    
    try {
        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Speak to the admin',
            error
        });
    }
}

const updateEvent = async(req, res) => {

    const { id } = req.params;


    try {
        
        const event = await Event.findById(id);
        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if(event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized'
            });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        
        return res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Speak to the admin',
            error
        });
    }
    
}

const deleteEvent = async(req, res) => {

    const { id } = req.params;

    try {
        
        const event = await Event.findById(id);
        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }
        if(event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized'
            });
        }

        await Event.findByIdAndDelete(id);
        
        return res.json({
            ok: true,
            msg: 'Event deleted'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Speak to the admin',
            error
        });
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent
}