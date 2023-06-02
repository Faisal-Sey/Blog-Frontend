import { BaseService } from './baseService';

class blogServices extends BaseService {
    getPosts = () => {
        return this.get(
            "api/posts/",
            false
        );
    }

    getPost = model => {
        return this.post(
            "api/post/",
            model,
            false
        );
    }

    updatePost = model => {
        return this.postForm(
            "api/post-update/",
            model,
            false
        );
    }

    getAllPosts = () => {
        return this.get(
            "api/get-all-posts/",
            false
        );
    }

    createPost = model => {
        return this.postForm(
            "api/posts/",
            model,
            false
        )
    }

    deletePost = model => {
        return this.delete(
            "api/posts/",
            model,
            false
        )
    }

    getAllDrafts = () => {
        return this.get(
            "api/drafts/",
            false
        );
    }

    createDraft = model => {
        return this.postForm(
            "api/drafts/",
            model,
            false
        )
    }

    deleteDraft = model => {
        return this.delete(
            "api/drafts/",
            model,
            false
        )
    }

    saveDraft = model => {
        return this.post(
            "api/save-draft/",
            model,
            false
        )
    }

    updateDraft = model => {
        return this.post(
            "api/draft-update/",
            model,
            false
        )
    }

    addPreview = model => {
        return this.post(
            "api/add-preview/",
            model,
            false
        )
    }

    getPreview = () => {
        return this.get(
            "api/get-preview/",
            false
        )
    }


    getComment = () => {
        return this.get(
            "api/update-comment/",
            false
        )
    }

    createComment = model => {
        return this.post(
            "api/update-comment/",
            model,
            false
        )
    }

    deleteComment = model => {
        return this.delete(
            "api/update-comment/",
            model,
            false
        )
    }

    getResponse = () => {
        return this.get(
            "api/update-response/",
            false
        )
    }

    createResponse = model => {
        return this.post(
            "api/update-response/",
            model,
            false
        )
    }

    deleteResponse = model => {
        return this.delete(
            "api/update-comment/",
            model,
            false
        )
    }

    getUserInfo = () => {
        return this.get(
            "api/get-user-info/",
            false
        )
    }

    getTickets = () => {
        return this.get(
            "api/tickets/",
            false
        );
    }

    getAllTickets = () => {
        return this.get(
            "api/get-all-tickets/",
            false
        );
    }

    getAllComments = () => {
        return this.get(
            "api/get-all-comments/",
            false
        );
    }

    
    createTicket = model => {
        return this.postForm(
            "api/tickets/",
            model,
            false
        )
    }

    updateTicket = model => {
        return this.postForm(
            "api/ticket-update/",
            model,
            false
        )
    }

    deleteTicket = model => {
        return this.delete(
            "api/tickets/",
            model,
            false
        )
    }

    getPostAnalytics = () => {
        return this.get(
            "api/post-analytics/",
            false
        )
    }

    getAllUsers = () => {
        return this.get(
            "api/get-all-users/",
            false
        )
    }

    postAnalytics = model => {
        return this.post(
            "api/update/by/day/",
            model,
            false
        )
    }

    getAnalytics = () => {
        return this.get(
            "api/update/by/day/",
            false
        )
    }

    commentAnalytics = () => {
        return this.get(
            "api/analytics/comments/",
            false
        )
    }

    clickAnalytics = () => {
        return this.get(
            "api/analytics/url-clicks/",
            false
        )
    }

    visitorsAnalytics = () => {
        return this.get(
            "api/analytics/visitors/",
            false
        )
    }

}

export default new blogServices();