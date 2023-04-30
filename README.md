## For Node Backend with TypeScript

---

#### To send files to cloud

```markdown
scp -r -i "{path/to/pem/file}.pem" deployment_config/ .env docker-compose.yml ubuntu@{ec2 machine name or ip address}:/home/ubuntu/{path/to/project}
```
