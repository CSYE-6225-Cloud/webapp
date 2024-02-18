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
  default = "csye6225-a03"
}

variable "zone" {
  type    = string
  default = "us-east4-c"
}

variable "source_image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "disk_type" {
  type    = string
  default = "pd-standard"
}

variable "disk_size" {
  type    = number
  default = 20
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
  ssh_username            = "packer"
}

build {
  sources = [
    "sources.googlecompute.csye6225-app-custom-image"
  ]

  provisioner "shell" {
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
    scripts = [
      "./unzip.sh",
      "./systemD/systemdSetup.sh",
      "./setDependencies.sh"
    ]
  }


}