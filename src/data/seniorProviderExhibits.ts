import type { Provider } from './course';

export type ProviderCaseArtifactSpec = {
  primaryBody: string;
  secondaryBody: string;
  distractorTitle: string;
  distractorBody: string;
  distractorAnalysis: string;
  auditSource: string;
  secondarySource: string;
  timestampPrimary: string;
  timestampSecondary: string;
  timestampDistractor: string;
  diagnosticCli: string;
};

type CaseProviderMap = Record<
  Provider,
  {
    primary: string;
    secondary: string;
    cli: string;
  }
>;

type CaseDistractorSpec = {
  title: string;
  body: Record<Provider, string>;
  analysis: string;
};

const AUDIT_SOURCES: Readonly<Record<Provider, { primary: string; secondary: string }>> = {
  aws: {
    primary: 'AWS CloudTrail / Config Plan',
    secondary: 'Amazon CloudWatch Metrics & Logs',
  },
  azure: {
    primary: 'Azure Activity Log / ARM What-If',
    secondary: 'Azure Monitor / Log Analytics KQL',
  },
  gcp: {
    primary: 'Google Cloud Audit Logs / Config',
    secondary: 'Cloud Monitoring & Cloud Logging',
  },
};

const CASE_PROVIDER_SPECS: Readonly<Record<string, CaseProviderMap>> = {
  s01: {
    aws: {
      primary:
        '-/+ resource "aws_db_instance" "orders_primary" must be replaced\n  ~ storage_encrypted   = true -> false # forces replacement\n  ~ deletion_protection = true -> false',
      secondary:
        'CloudTrail eventName=ModifyDBInstance status=PENDING_APPROVAL\ncommit=8f2a9c · pr=#412 (sin revisión DBA)\nbackupWindow=03:00Z · automatedSnapshot=rds:orders-2026-11-16',
      cli: 'aws rds describe-db-instances --db-instance-identifier orders-primary --query "DBInstances[0].{Encrypted:StorageEncrypted,DeleteProtect:DeletionProtection}"',
    },
    azure: {
      primary:
        '-/+ resource "azurerm_postgresql_flexible_server" "orders_primary" must be replaced\n  ~ geo_redundant_backup_enabled = true -> false # forces new resource\n  - customer_managed_key_id      = "/subscriptions/.../keys/pg-cmk"',
      secondary:
        'ActivityLog operation=Microsoft.DBforPostgreSQL/flexibleServers/write\nchangeTicket=NONE · reviewer=pending\npointInTimeRestoreEarliest=2026-11-09T00:00:00Z',
      cli: 'az postgres flexible-server show -g rg-prod-data -n pg-orders-primary --query "{geoBackup:backup.geoRedundantBackup,state:state}"',
    },
    gcp: {
      primary:
        '-/+ resource "google_sql_database_instance" "orders_primary" must be replaced\n  ~ encryption_key_name   = "projects/prod/locations/us-central1/keyRings/db/cryptoKeys/sql" -> null # forces replacement\n  ~ deletion_protection   = true -> false',
      secondary:
        'CloudAuditLogs method=cloudsql.instances.update status=DRY_RUN_FLAGGED\nmergeCommit=8f2a9c · approval=MISSING\npitrEnabled=true · binaryLogRetentionDays=7',
      cli: 'gcloud sql instances describe orders-primary --format="json(settings.deletionProtectionEnabled,diskEncryptionConfiguration)"',
    },
  },
  s02: {
    aws: {
      primary:
        '{\n  "RoleName": "gha-deploy-runner",\n  "Effect": "Allow",\n  "Action": "*",\n  "Resource": "*"\n}',
      secondary:
        'CloudTrail principal=assumed-role/gha-deploy-runner\nactionsObserved=["s3:ListAllMyBuckets","iam:CreateRole","ec2:DeleteSecurityGroup"]\nexpectedScope=["lambda:UpdateFunctionCode"]',
      cli: 'aws iam list-attached-role-policies --role-name gha-deploy-runner',
    },
    azure: {
      primary:
        '{\n  "principalName": "sp-github-deploy",\n  "roleDefinitionName": "Owner",\n  "scope": "/subscriptions/00000000-prod"\n}',
      secondary:
        'AzureActivity caller=sp-github-deploy\noperations=["Microsoft.Authorization/roleAssignments/write","Microsoft.Compute/virtualMachines/delete"]\nexpectedScope="Microsoft.Web/sites/functions/write"',
      cli: 'az role assignment list --assignee sp-github-deploy --all --output table',
    },
    gcp: {
      primary:
        'bindings:\n- members: ["serviceAccount:ci-runner@prod-app.iam.gserviceaccount.com"]\n  role: "roles/owner"\n  scope: "organizations/901283"',
      secondary:
        'AuditLog principalEmail=ci-runner@prod-app.iam.gserviceaccount.com\nmethods=["iam.serviceAccounts.create","compute.firewalls.delete"]\nexpectedMethod="cloudfunctions.functions.patch"',
      cli: 'gcloud projects get-iam-policy prod-app --flatten="bindings[].members" --filter="bindings.members:ci-runner"',
    },
  },
  s03: {
    aws: {
      primary:
        'GitHub Secret Scanning ALERT #91\nkeyId=AKIA_SYNTHETIC_EXAMPLE (redacted)\nrepo=org/checkout-web (public) · commit=78e0b2 · 09:42Z',
      secondary:
        'CloudTrail userIdentity.accessKeyId=AKIA...SYNTHETIC\n09:51Z sts:GetCallerIdentity srcIP=198.51.100.44\n09:55Z s3:GetObject bucket=prod-invoices-archive',
      cli: 'aws cloudtrail lookup-events --lookup-attributes AttributeKey=AccessKeyId,AttributeValue=AKIA_REDACTED --max-results 20',
    },
    azure: {
      primary:
        'Defender DevOps Secret Alert #91\nAZURE_CLIENT_SECRET=8Q~synthetic_redacted_value\nrepo=org/checkout-web (public) · commit=78e0b2 · 09:42Z',
      secondary:
        'EntraSignInLogs appId=sp-billing-sync\n09:51Z tokenIssued ipAddress=198.51.100.44\n09:55Z Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read',
      cli: 'az monitor activity-log list --caller sp-billing-sync --offset 2h --output table',
    },
    gcp: {
      primary:
        'Secret Push Protection Retrospective #91\nprivate_key_id="9f81a0_synthetic_sa_json_key"\nrepo=org/checkout-web (public) · commit=78e0b2 · 09:42Z',
      secondary:
        'CloudAuditLogs serviceAccountKeyName=.../keys/9f81a0\n09:51Z storage.buckets.list callerIp=198.51.100.44\n09:55Z storage.objects.get bucket=prod-invoices-gcs',
      cli: 'gcloud iam service-accounts keys list --iam-account=billing-sync@prod-app.iam.gserviceaccount.com',
    },
  },
  s04: {
    aws: {
      primary:
        'ALB TargetGroup tg-payments-prod (release 2026.11.16-4)\nHealthCheck /ready -> HTTP 500\nHealthyHostCount=0/6 · UnHealthyHostCount=6/6',
      secondary:
        'CloudWatch AWS/ApplicationELB HTTPCode_ELB_5XX_Count\nbeforeDeploy=0.2% · afterDeploy=32.4%\np50 TargetResponseTime: 180ms -> 2310ms',
      cli: 'aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:111122223333:targetgroup/tg-payments/01',
    },
    azure: {
      primary:
        'Application Gateway backendPool bp-payments-prod (rev 2026.11.16-4)\nHealthProbe /ready -> Unhealthy\nHealthyServerCount=0/6',
      secondary:
        'AzureMonitor FailedRequests ratio\nbeforeDeploy=0.2% · afterDeploy=32.1%\nBackendLastByteResponseTime p50: 180ms -> 2290ms',
      cli: 'az network application-gateway show-backend-health -g rg-prod-edge -n agw-payments',
    },
    gcp: {
      primary:
        'Global HTTPS LB backendService bs-payments-prod (rev 2026.11.16-4)\nHealthCheck /ready -> UNHEALTHY\nhealthyInstances=0/6',
      secondary:
        'CloudMonitoring loadbalancing.googleapis.com/https/request_count (5xx)\nbeforeDeploy=0.2% · afterDeploy=31.9%\nbackend_latencies p50: 180ms -> 2340ms',
      cli: 'gcloud compute backend-services get-health bs-payments-prod --global',
    },
  },
  s05: {
    aws: {
      primary:
        'VPC Reachability Analyzer path=eni-app-10.20.2.8 -> eni-rds-10.20.8.14:5432\nRoute53 privateZone resolved=10.20.8.14\nVPC FlowLog action=REJECT protocol=6 dstport=5432',
      secondary:
        'SecurityGroup sg-rds-postgres InboundRules:\nAllow tcp/5432 from 10.20.9.0/24 (legacy-subnet)\nApp ECS subnet CIDR=10.20.2.0/24 (missing)',
      cli: 'aws ec2 describe-security-groups --group-ids sg-0abc5432db --query "SecurityGroups[0].IpPermissions"',
    },
    azure: {
      primary:
        'Network Watcher IP Flow Verify VM=10.20.2.8 -> PG=10.20.8.14:5432\nPrivate DNS Zone resolved=10.20.8.14\nAccess=Deny rule=DefaultInboundDenyAll',
      secondary:
        'NSG nsg-subnet-data SecurityRules:\nAllow-Postgres-5432 sourceAddressPrefix=10.20.9.0/24\nApp subnet prefix=10.20.2.0/24 (not permitted)',
      cli: 'az network nsg rule list -g rg-prod-net --nsg-name nsg-subnet-data --output table',
    },
    gcp: {
      primary:
        'Connectivity Tests src=10.20.2.8 (subnet-app) -> dst=10.20.8.14:5432 (Cloud SQL PSA)\nCloud DNS private zone=RESOLVED\nPacket drop reason=FIREWALL_DENIED_EGRESS_OR_INGRESS',
      secondary:
        'VPC Firewall Rule allow-db-ingress-5432:\nsourceRanges=["10.20.9.0/24"] · targetTags=["db-tier"]\nWorkload subnet range="10.20.2.0/24"',
      cli: 'gcloud compute firewall-rules describe allow-db-ingress-5432 --format=json',
    },
  },
  s06: {
    aws: {
      primary:
        'Cost Explorer Daily Anomaly: $1,200 -> $7,640 (+536%)\nDataTransfer-Out-Bytes (us-east-1 -> eu-west-1): +480%\nEC2-Instances (m6i.4xlarge idle): 26 nodos',
      secondary:
        'EventBridge + ASG History:\n sync-dr-mirror cron cambiado a cada 5 min sin compresión\n eks-batch-asg MinSize fijado manualmente en 26',
      cli: 'aws ce get-cost-and-usage --time-period Start=2026-11-01,End=2026-11-16 --granularity DAILY --metrics UnblendedCost',
    },
    azure: {
      primary:
        'Cost Management Anomaly Alert: $1,200 -> $7,590\nBandwidth Inter-Region Egress (East US -> West Europe): +475%\nVMSS Standard_D16s_v5 idle: 26 instancias',
      secondary:
        'ActivityLog:\n AzCopy replication job programado cada 5 min\n Autoscale profile minimumCapacity=26 en pool batch',
      cli: 'az monitor autoscale show -g rg-prod-compute -n autoscale-batch-vmss',
    },
    gcp: {
      primary:
        'Cloud Billing Cost Spike: $1,200 -> $7,610\nCompute Engine Network Inter-Region Egress: +482%\nGKE NodePool n2-standard-16 idle: 26 nodos',
      secondary:
        'CloudLogging:\n Storage Transfer job ejecutando full-copy cada 5 min\n GKE cluster-autoscaler minNodeCount=26',
      cli: 'gcloud container clusters describe prod-gke --region us-central1 --format="value(nodePools.autoscaling)"',
    },
  },
  s07: {
    aws: {
      primary:
        'EKS Pod describe pod/billing-api-7d9f8b-xk2p\nState: Waiting (CrashLoopBackOff) · restartCount=9\nLastState: Terminated (ExitCode=1, OOMKilled=false)',
      secondary:
        'kubectl logs pod/billing-api-7d9f8b-xk2p:\nFATAL ConfigValidationError: env CONFIG_DATABASE_URL is undefined\nExternalSecret aws-secretsmanager key rename mismatch',
      cli: 'aws eks describe-cluster --name prod-eks --query "cluster.status"',
    },
    azure: {
      primary:
        'AKS Pod events pod/billing-api-7d9f8b-xk2p\nReason=BackOff · Back-off restarting failed container\nExitCode=1 · OOMKilled=false',
      secondary:
        'ContainerLogV2 (AKS):\nFATAL ConfigValidationError: env CONFIG_DATABASE_URL missing\nKeyVault CSI SecretProviderClass key alias mismatch',
      cli: 'az aks show -g rg-prod-aks -n aks-prod-cluster --query "provisioningState"',
    },
    gcp: {
      primary:
        'GKE Pod status pod/billing-api-7d9f8b-xk2p\nWaiting: CrashLoopBackOff · restarts=9\nLast termination: exitCode=1, reason=Error (OOMKilled=false)',
      secondary:
        'CloudLogging k8s_container:\nFATAL ConfigValidationError: CONFIG_DATABASE_URL missing\nSecret Manager CSI mount env var missing in Deployment spec',
      cli: 'gcloud container clusters describe prod-gke --region us-central1 --format="value(status)"',
    },
  },
  s08: {
    aws: {
      primary:
        'AWS Backup Vault prod-vault:\nDaily snapshot status=COMPLETED · Retention=30d\nLastVerifiedRestoreDrill=NEVER (0 executions)',
      secondary:
        'Business Continuity Spec:\nRequired RPO=15 min · Required RTO=60 min\nCurrent AWS Backup schedule=cron(0 4 * * ? *) (cada 24h, sin PITR)',
      cli: 'aws backup list-recovery-points-by-backup-vault --backup-vault-name prod-vault --max-results 5',
    },
    azure: {
      primary:
        'Recovery Services Vault rsv-prod:\nDaily backup job=Completed · Retention=30d\nTestRestoreDrillsCompleted=0',
      secondary:
        'DR Contract:\nRequired RPO=15 min · Required RTO=60 min\nCurrent policy=1 snapshot/24h (PITR log backup deshabilitado)',
      cli: 'az backup item list -g rg-prod-dr -v rsv-prod --output table',
    },
    gcp: {
      primary:
        'Backup and DR Service backupPlan bp-prod:\nDaily snapshot=SUCCEEDED · Retention=30d\nVerifiedRestoreTests=0',
      secondary:
        'Service Continuity Target:\nRequired RPO=15 min · Required RTO=60 min\nCurrent schedule=every 24h (Point-in-time recovery OFF)',
      cli: 'gcloud sql backups list --instance=orders-primary --limit=5',
    },
  },
  s09: {
    aws: {
      primary:
        'S3 Bucket prod-customer-exports:\nPublicAccessBlockConfiguration: BlockPublicPolicy=false\nBucketPolicy: Effect=Allow, Principal="*", Action="s3:GetObject", Resource="arn:aws:s3:::prod-customer-exports/private/*"',
      secondary:
        'S3 Server Access Logs / CloudTrail Data Events:\n187 anonymous HTTP 200 GET requests on /private/*\nfirstSeen=2026-11-16T08:12:04Z',
      cli: 'aws s3api get-public-access-block --bucket prod-customer-exports',
    },
    azure: {
      primary:
        'Storage Account stprodexports:\nallowBlobPublicAccess=true\nContainer "private-exports" publicAccess="blob" (anonymous read enabled for blobs)',
      secondary:
        'StorageBlobLogs:\n187 anonymous GetBlob 200 responses on /private-exports/*\nfirstSeen=2026-11-16T08:12:04Z',
      cli: 'az storage account show -g rg-prod-data -n stprodexports --query "{allowBlobPublicAccess:allowBlobPublicAccess}"',
    },
    gcp: {
      primary:
        'Cloud Storage Bucket gs://prod-customer-exports:\npublicAccessPrevention="inherited" (not enforced)\nIAM Policy binding: role="roles/storage.objectViewer", members=["allUsers"]',
      secondary:
        'CloudAuditLogs data_access:\n187 anonymous storage.objects.get 200 OK on prefix private/\nfirstSeen=2026-11-16T08:12:04Z',
      cli: 'gcloud storage buckets describe gs://prod-customer-exports --format="json(iamConfiguration)"',
    },
  },
  s10: {
    aws: {
      primary:
        'CloudWatch ServiceLens SLO checkout-availability:\nRolling 30d target=99.90% · Current=99.88%\nError budget remaining=0.0% (100% consumed)',
      secondary:
        'Change Calendar:\nFeature release "instant-one-click-v2" (blastRadius=HIGH) programado mañana 10:00Z\nAutomated rollback smoke test=NOT_EXECUTED',
      cli: 'aws cloudwatch describe-alarms --alarm-name-prefix checkout-slo',
    },
    azure: {
      primary:
        'Azure Monitor Workbook SLO checkout-availability:\nRolling 30d target=99.90% · Current=99.88%\nError budget remaining=0.0%',
      secondary:
        'Release Pipeline Gate:\nFeature release de alto riesgo programada mañana\nRollback verification stage=SKIPPED',
      cli: 'az monitor metrics alert list -g rg-prod-sre --output table',
    },
    gcp: {
      primary:
        'Cloud Monitoring Service Monitoring SLO checkout-availability:\nRolling 30d target=99.90% · Burn rate=2.8x\nError budget remaining=0.0%',
      secondary:
        'Cloud Deploy Promotion Queue:\nHigh-risk release candidata a prod mañana\nCanary rollback verification=NOT_RUN',
      cli: 'gcloud monitoring slos list --service=checkout-prod',
    },
  },
  s11: {
    aws: {
      primary:
        'AWS X-Ray Trace Waterfall POST /api/checkout (p99=3520ms):\nauth-svc=98ms · pricing-svc=118ms · inventory-svc=2840ms',
      secondary:
        'X-Ray Subsegments inventory-svc:\n3 synchronous retries per request × timeout=900ms\nNo jitter / no circuit breaker configured',
      cli: 'aws xray get-service-graph --start-time 1763280000 --end-time 1763283600',
    },
    azure: {
      primary:
        'Application Insights End-to-End Transaction POST /api/checkout (p99=3510ms):\nauth-svc=101ms · pricing-svc=119ms · inventory-svc=2810ms',
      secondary:
        'DependencyCalls KQL:\ninventory-svc synchronous retryCount=3 · timeout=900ms each\nRetry storm amplifies tail latency',
      cli: 'az monitor app-insights component show -g rg-prod-obs -a ai-checkout-prod',
    },
    gcp: {
      primary:
        'Cloud Trace Span Waterfall POST /api/checkout (p99=3505ms):\nauth-svc=96ms · pricing-svc=115ms · inventory-svc=2825ms',
      secondary:
        'Span Attributes inventory-svc:\nretry_attempts=3 synchronous · per_try_timeout=900ms\nMissing exponential backoff andhedging budget',
      cli: 'gcloud trace sinks list',
    },
  },
  s12: {
    aws: {
      primary:
        'GuardDuty EKS Runtime Protection Finding: PrivilegeEscalation:Runtime/PrivilegedContainer\nNamespace=kube-system · Node=ip-10-20-4-17.ec2.internal\nUnexpected outbound TCP to 203.0.113.99:4444',
      secondary:
        'EKS Audit Log:\nautomountServiceAccountToken=true (cluster-admin binding)\nsecurityContext.privileged=true · NetworkPolicy=NONE',
      cli: 'aws guardduty list-findings --detector-id 12abc34def56 --max-results 10',
    },
    azure: {
      primary:
        'Defender for Containers Alert: Privileged container with suspicious egress\nNamespace=kube-system · Node=aks-systempool-17\nOutbound connection to 203.0.113.99:4444',
      secondary:
        'AKS Diagnostic Audit:\nServiceAccount token mounted · privileged=true · hostPID=true\nAzure Network Policy=disabled',
      cli: 'az security alert list --output table',
    },
    gcp: {
      primary:
        'Security Command Center Event Threat Detection: Suspicious binary & privileged pod\nNamespace=kube-system · Node=gke-prod-pool-node-17\nEgress to 203.0.113.99:4444',
      secondary:
        'GKE Audit Log:\nautomountServiceAccountToken=true · privileged=true\nDataplane V2 NetworkPolicy=none in namespace',
      cli: 'gcloud container clusters describe prod-gke --region us-central1 --format="value(networkPolicy)"',
    },
  },
  s13: {
    aws: {
      primary:
        'Route 53 HealthCheck us-east-1 errorRate=81%\neu-west-1 warm standby healthy=YES\nAurora Global Database ReplicaLag=14m 20s',
      secondary:
        'DR Runbook Contract:\nTarget RTO=60m · Target RPO=15m\nReplica lag approaching 15m RPO ceiling; last failover game-day=6 weeks ago',
      cli: 'aws rds describe-global-clusters --global-cluster-identifier aurora-orders-global',
    },
    azure: {
      primary:
        'Azure Front Door Origin eastus errorRate=81%\nwesteurope standby healthy=YES\nPostgreSQL Geo-Replica replicationLag=14m 15s',
      secondary:
        'DR Plan:\nTarget RTO=60m · Target RPO=15m\nUnplanned failover risks losing in-flight WAL near 15m threshold',
      cli: 'az network front-door show -g rg-prod-edge -n fd-orders-global',
    },
    gcp: {
      primary:
        'Cloud DNS Routing Health us-central1 errorRate=81%\neurope-west1 standby healthy=YES\nCloud SQL Cross-Region Replica lag=14m 10s',
      secondary:
        'Continuity Policy:\nTarget RTO=60m · Target RPO=15m\nPromotion without verifying lag delta risks breaching RPO',
      cli: 'gcloud sql instances describe orders-replica-eu --format="json(replicaConfiguration)"',
    },
  },
  s14: {
    aws: {
      primary:
        'SQS Standard Queue payments-events:\nApproximateReceiveCount=2..4 · Duplicate messageId observed\nConsumer Lambda processed payment_id=pay_991 twice',
      secondary:
        'Aurora PostgreSQL ledger_charges audit:\n2 rows inserted for order_id="AB-132"\nUNIQUE constraint on idempotency_key=MISSING',
      cli: 'aws sqs get-queue-attributes --queue-url https://sqs.us-east-1.amazonaws.com/111122223333/payments-events --attribute-names All',
    },
    azure: {
      primary:
        'Azure Service Bus Queue payments-events:\nDeliveryCount=3 · At-least-once redelivery after lock timeout\nFunction processed payment_id=pay_991 multiple times',
      secondary:
        'PostgreSQL ledger_charges audit:\nDuplicate charge rows for order_id="AB-132"\nUNIQUE index on idempotency_key=NONE',
      cli: 'az servicebus queue show -g rg-prod-msg --namespace-name sb-payments -n payments-events',
    },
    gcp: {
      primary:
        'Cloud Pub/Sub Subscription payments-events-sub:\nAt-least-once redelivery after ackDeadline=10s expiry\nCloud Run consumer executed payment_id=pay_991 twice',
      secondary:
        'Cloud SQL ledger_charges audit:\nDuplicate charge rows for order_id="AB-132"\nUNIQUE constraint on idempotency_key=NONE',
      cli: 'gcloud pubsub subscriptions describe payments-events-sub',
    },
  },
  s15: {
    aws: {
      primary:
        '.github/workflows/deploy.yml:\nimage: 111122223333.dkr.ecr.us-east-1.amazonaws.com/api:latest\nenv: AWS_SECRET_ACCESS_KEY=${{ secrets.PROD_STATIC_KEY }}',
      secondary:
        'ECR Image Scan & Supply Chain Gate:\ncriticalCVEs=2 · SBOM CycloneDX=MISSING · Cosign signature verification=DISABLED',
      cli: 'aws ecr describe-image-scan-findings --repository-name api --image-id imageTag=latest',
    },
    azure: {
      primary:
        '.github/workflows/deploy.yml:\nimage: prodacr.azurecr.io/api:latest\nenv: AZURE_CREDENTIALS=${{ secrets.STATIC_SP_JSON }}',
      secondary:
        'Defender Container Registry Scan:\ncriticalCVEs=2 · SBOM=MISSING · Notation/Cosign policy=DISABLED',
      cli: 'az acr repository show-tags -n prodacr --repository api --detail',
    },
    gcp: {
      primary:
        '.github/workflows/deploy.yml:\nimage: us-docker.pkg.dev/prod-app/containers/api:latest\nenv: GOOGLE_CREDENTIALS=${{ secrets.STATIC_SA_KEY_JSON }}',
      secondary:
        'Artifact Analysis & Binary Authorization:\ncriticalCVEs=2 · SBOM=MISSING · Binary Authorization policy=ALLOW_ALL',
      cli: 'gcloud artifacts docker images list us-docker.pkg.dev/prod-app/containers/api --show-occurrences',
    },
  },
  s16: {
    aws: {
      primary:
        'EKS HPA scaled checkout-api replicas: 8 -> 48 pods\nRDS PostgreSQL DatabaseConnections=500/500 (FATAL: sorry, too many clients)\nALB HTTP 5xx=17.4%',
      secondary:
        'App Pool Config:\nmax_pool_per_pod=20 (48 × 20 = 960 > DB max_connections=500)\nRDS Proxy / PgBouncer=NOT_CONFIGURED',
      cli: 'aws cloudwatch get-metric-statistics --namespace AWS/RDS --metric-name DatabaseConnections --period 60 --statistics Maximum --start-time 2026-11-16T09:00:00Z --end-time 2026-11-16T09:30:00Z',
    },
    azure: {
      primary:
        'AKS HPA scaled checkout-api replicas: 8 -> 48 pods\nAzure PostgreSQL Flexible active_connections=500/500 (connection limit reached)\nHTTP 5xx=17.1%',
      secondary:
        'App Pool Config:\nmax_pool_per_pod=20 (demanda potencial 960 conexiones)\nPgBouncer integrado en Flexible Server=DISABLED',
      cli: 'az postgres flexible-server parameter show -g rg-prod-data -s pg-orders-primary --name max_connections',
    },
    gcp: {
      primary:
        'GKE HPA scaled checkout-api replicas: 8 -> 48 pods\nCloud SQL PostgreSQL database/postgresql/num_backends=500/500\nHTTP 5xx=17.3%',
      secondary:
        'App Pool Config:\nmax_pool_per_pod=20 sin presupuesto global de conexiones\nConnection pooler PgBouncer=NOT_DEPLOYED',
      cli: 'gcloud sql instances describe orders-primary --format="json(settings.databaseFlags)"',
    },
  },
  s17: {
    aws: {
      primary:
        'Architecture Proposal "Active-Active-Active AWS+Azure+GCP":\nRegulatory mandate=NONE · Target availability=99.90%\nTeam size=5 engineers',
      secondary:
        'FinOps & Complexity Model:\nSingle-cloud multi-AZ cost=100 units · 3-cloud active mesh=280 units\nCross-cloud data egress & IAM drift risk=HIGH',
      cli: 'aws wellarchitected list-workloads --max-results 10',
    },
    azure: {
      primary:
        'Architecture Proposal "Tri-Cloud Abstraction Layer":\nRegulatory mandate=NONE · Target availability=99.90%\nTeam size=5 engineers',
      secondary:
        'TCO Forecast:\nSingle Azure multi-zone cost=100 units · 3-cloud deployment=280 units\nMeasured availability gain=0.00% (unverified)',
      cli: 'az advisor recommendation list --category Cost --output table',
    },
    gcp: {
      primary:
        'Architecture Proposal "Simultaneous 3-Cloud Kubernetes Mesh":\nRegulatory mandate=NONE · Target availability=99.90%\nTeam size=5 engineers',
      secondary:
        'TCO & Operational Review:\nSingle GCP regional HA cost=100 units · 3-cloud setup=280 units\nOperational toil triples on-call surface',
      cli: 'gcloud recommender recommendations list --project=prod-app --location=global --recommender=google.compute.instance.MachineTypeRecommender',
    },
  },
  s18: {
    aws: {
      primary:
        'Enterprise Architecture Board Gate (AWS Prod):\nSLO=99.95% · RTO<=60m · RPO<=15m · Regulated PII=YES',
      secondary:
        'Readiness Audit:\nKMS CMK encryption=TBD · Automated restore drill=TBD · Multi-AZ/Region failover test=TBD',
      cli: 'aws securityhub get-enabled-standards',
    },
    azure: {
      primary:
        'Enterprise Architecture Board Gate (Azure Prod):\nSLO=99.95% · RTO<=60m · RPO<=15m · Regulated PII=YES',
      secondary:
        'Readiness Audit:\nKey Vault CMK=TBD · Recovery Vault drill=TBD · Front Door failover test=TBD',
      cli: 'az policy state summarize -g rg-prod-core',
    },
    gcp: {
      primary:
        'Enterprise Architecture Board Gate (GCP Prod):\nSLO=99.95% · RTO<=60m · RPO<=15m · Regulated PII=YES',
      secondary:
        'Readiness Audit:\nCloud KMS CMEK=TBD · Backup DR restore drill=TBD · Global LB failover test=TBD',
      cli: 'gcloud asset search-all-resources --scope=projects/prod-app --page-size=10',
    },
  },
};

function buildDistractorForCase(caseId: string): CaseDistractorSpec {
  const num = Number.parseInt(caseId.replace(/\D/g, ''), 10) || 1;
  if (num % 3 === 1) {
    return {
      title: 'Señal colateral: Cronjob nocturno de analítica (Ruido benigno)',
      body: {
        aws: 'CloudWatch batch-etl-hourly: CPU spike 42% -> 61% durante 90s (dentro de línea base histórica p95=68%, 0 errores).',
        azure:
          'Azure Monitor batch-etl-hourly: CPU 44% -> 62% durante 90s (dentro de umbral normal p95=68%, 0 fallos).',
        gcp: 'Cloud Monitoring batch-etl-hourly: CPU 41% -> 60% por 90s (comportamiento habitual cada hora en punto, 0 errores).',
      },
      analysis:
        'Contraprueba (Red Herring): este pico breve pertenece a un job por lotes aislado y saludable dentro de su línea base histórica; citarlo como causa desvía la mitigación real.',
    };
  }
  if (num % 3 === 2) {
    return {
      title: 'Señal colateral: Renovación automática de certificado público (Ruido benigno)',
      body: {
        aws: 'ACM Certificate Renewal Event: renovación programada completada con éxito 18h antes del incidente (estado ISSUED).',
        azure:
          'App Service Managed Certificate: rotación rutinaria exitosa 18h antes del evento (0 conexiones TLS rechazadas).',
        gcp: 'Google-managed SSL Certificate: renovación automática PROVISIONED 18h antes sin errores de handshake TLS.',
      },
      analysis:
        'Contraprueba (Red Herring): la rotación de certificados ocurrió 18 horas antes con estado saludable y cero fallos TLS; correlación temporal lejana no implica causalidad.',
    };
  }
  return {
    title: 'Señal colateral: Escaneo sintético externo 404 en /favicon.ico (Ruido benigno)',
    body: {
      aws: 'ALB Access Log: 14 peticiones GET /favicon.ico -> HTTP 404 desde sonda de uptime (tasa constante desde hace 90 días).',
      azure:
        'App Gateway Access Log: 14 peticiones GET /favicon.ico -> HTTP 404 desde monitor externo (sin variación respecto al mes anterior).',
      gcp: 'Cloud Load Balancing Log: 14 peticiones GET /favicon.ico -> HTTP 404 de sonda rutinaria (ruido de fondo constante).',
    },
    analysis:
      'Contraprueba (Red Herring): los 404 sobre /favicon.ico son ruido constante e inocuo de sondas; no guardan relación causal con el incidente investigado.',
  };
}

export function getProviderCaseArtifactSpec(
  caseId: string,
  provider: Provider,
): ProviderCaseArtifactSpec {
  const entry = CASE_PROVIDER_SPECS[caseId]?.[provider] || CASE_PROVIDER_SPECS.s01[provider];
  const distractor = buildDistractorForCase(caseId);
  const sources = AUDIT_SOURCES[provider];

  return {
    primaryBody: entry.primary,
    secondaryBody: entry.secondary,
    distractorTitle: distractor.title,
    distractorBody: distractor.body[provider],
    distractorAnalysis: distractor.analysis,
    auditSource: sources.primary,
    secondarySource: sources.secondary,
    timestampPrimary: '2026-11-16T09:14:22Z',
    timestampSecondary: '2026-11-16T09:16:08Z',
    timestampDistractor: '2026-11-16T09:18:45Z',
    diagnosticCli: entry.cli,
  };
}

export function getAllProviderCommandsForCase(caseId: string): Record<Provider, string> {
  const map = CASE_PROVIDER_SPECS[caseId] || CASE_PROVIDER_SPECS.s01;
  return {
    aws: map.aws.cli,
    azure: map.azure.cli,
    gcp: map.gcp.cli,
  };
}
