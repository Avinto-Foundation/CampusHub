from django.urls import include, path
from django.views.generic.base import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("", RedirectView.as_view(url="/api/docs/", permanent=False)),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/library/", include("m1_library.urls")),
    path("api/events/", include("m2_events.urls")),
    path("api/gpa/", include("m3_gpa.urls")),
    path("api/hostel/", include("m4_hostel.urls")),
    path("api/bus/", include("m5_bus.urls")),
    path("api/print/", include("m6_printshop.urls")),
    path("api/attendance/", include("m7_attendance.urls")),
    path("api/canteen/", include("m8_canteen.urls")),
]
