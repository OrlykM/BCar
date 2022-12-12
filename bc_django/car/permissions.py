from rest_framework import permissions
from user.models import Order
class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        car_id = view.kwargs.get('pk', None)
        user_id = request.user.id
        try:
            order = Order.objects.filter(car=car_id, order_type='owning').last()
            if order is None:
                return False
            if order.user.id == user_id:
                return True
            return False
        except Order.DoesNotExist:
            return False
class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff == 1:
            return True
        return False


