from django.urls import path

from .views import PriceListView, PrintJobDetailView, PrintJobListCreateView

urlpatterns = [
    path("jobs/", PrintJobListCreateView.as_view(), name="print-jobs"),
    path("jobs/<int:id>/", PrintJobDetailView.as_view(), name="print-job-detail"),
    path("prices/", PriceListView.as_view(), name="print-prices"),
]
