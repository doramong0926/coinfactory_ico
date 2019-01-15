from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = "bluecots_ico.users"
    verbose_name = "Users"

    def ready(self):
        try:
            import users.signals  # noqa F401
        except ImportError:
            pass
