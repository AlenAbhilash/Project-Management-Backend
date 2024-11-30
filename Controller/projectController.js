const projects = require('../Models/projectSchema');
const project = require('../Models/projectSchema');

// Add project
exports.addproject = async (req, res) => {
    console.log("Inside add project function");

    const { title, language, github, website, overview } = req.body;
    const projectImage = req.file ? req.file.filename : null;
    const userId = req.payload;

    try {
        const existingProject = await project.findOne({ github });

        if (existingProject) {
            return res.status(406).json("Project already exists in our collection... please add another one");
        } else {
            const newProject = new project({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            });
            await newProject.save();
            return res.status(200).json(newProject);
        }
    } catch (err) {
        console.error("Error adding project:", err);
        return res.status(500).json("Server error while adding project");
    }
};

//getHomeProjects
exports.getHomeProject = async (req, res) => {
    try {
        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//getUserProject
exports.getUserProject = async (req, res) => {
    const userId = req.payload;
    try {
        const UserProject = await projects.find({ userId })
        res.status(200).json(UserProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//getAllProjects

exports.getAllProject = async (req, res) => {
    const searchKey = req.query.searchKey
    const query = {
        language: { $regex: searchKey, $options: "i" }
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    }
    catch (err) {
        res.status(401).json(err)
    } 
}


//edit Project
exports.editUserProject = async (req, res) => {
    const { title, language, github, website, overview } = req.body;
    const { pid } = req.params;
    const userId = req.payload;
    try {
        const existingProject = await project.findById(pid);
        const uploadImage = req.file ? req.file.filename : existingProject.projectImage;

        const updateProject = await project.findByIdAndUpdate(
            { _id: pid },
            { title, language, github, website, overview, projectImage: uploadImage, userId },
            { new: true }
        );
        await updateProject.save();
        res.status(200).json(updateProject);
    } catch (err) {
        res.status(401).json(err);
    }
};

//delete Project

exports.deleteProject = async (req, res) => {
    const { pid } = req.params;
    try {
        const DeleteData = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(DeleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}