from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        url_id = view.kwargs.get('user_id', None)
        user_id = request.user.id
        if user_id == None:
            return False
        if user_id != url_id:
            return False
        return True

        
class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff == 1:
            return True
        return False
