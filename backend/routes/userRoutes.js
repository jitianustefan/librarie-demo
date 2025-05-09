import express from 'express';
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser 
    } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router
    .route('/')
    .get(protect, admin, getUsers)
    .post(registerUser);

router.post('/logout', logoutUser);
router.post('/login', authUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;