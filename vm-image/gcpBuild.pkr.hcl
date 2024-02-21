packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1.0.0"
    }
  }
}

variable "project_id" {
  type    = string
  default = env("PROJECT_ID")
}

variable "zone" {
  type    = string
  default = env("ZONE")
}

variable "source_image_family" {
  type    = string
  default = env("SOURCE_IMAGE_FAMILY")
}

variable "disk_type" {
  type    = string
  default = "pd-standard"
}

variable "disk_size" {
  type    = number
  default = 100
}


variable "db_name" {
  type    = string
  default = env("DB_NAME")
}

variable "db_user" {
  type    = string
  default = env("DB_USER")
}

variable "db_password" {
  type    = string
  default = env("DB_PASSWORD")
}

variable "ssh_username" {
  type    = string
  default = env("SSH_USERNAME")
}

variable "port" {
  type    = number
  default = env("PORT")
}

variable "host" {
  type    = string
  default = env("HOST")
}

variable "dialect" {
  type    = string
  default = env("DIALECT")
}

source "googlecompute" "csye6225-app-custom-image" {
  project_id              = var.project_id
  source_image_family     = var.source_image_family
  zone                    = var.zone
  disk_size               = var.disk_size
  disk_type               = var.disk_type
  image_name              = "csye6225-{{timestamp}}"
  image_description       = "Custom Image for GCP CSYE6225 app"
  image_family            = "csye6225-image-family"
  image_storage_locations = ["us"]
  ssh_username            = var.ssh_username
}

build {
  sources = [
    "sources.googlecompute.csye6225-app-custom-image"
  ]

  provisioner "shell" {
    environment_vars = ["DB_NAME=${var.db_name}",
      "DB_USER=${var.db_user}",
    "DB_PASSWORD=${var.db_password}"]

    scripts = [
      # "./update.sh",
      "./envSetup.sh",
      "./dbSetup.sh",

    ]
  }

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/"
  }

  provisioner "file" {
    source      = "./systemD/systemdService.service"
    destination = "/tmp/"
  }

  provisioner "shell" {
    environment_vars = ["DB_NAME=${var.db_name}",
      "DB_USER=${var.db_user}",
      "DB_PASSWORD=${var.db_password}",
      "PORT= ${var.port}",
      "HOST=${var.host}",
    "DIALECT=${var.dialect}"]

    scripts = [
      "./unzip.sh",
      "./setDependencies.sh",
      "./systemD/systemdSetup.sh"
    ]
  }


}