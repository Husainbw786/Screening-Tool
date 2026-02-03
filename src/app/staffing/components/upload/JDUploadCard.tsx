import { UploadCardBase } from "./UploadCardBase";

interface JDUploadCardProps {
  title: string;
  description: string;
  buttonText: string;
  infoTitle: string;
  items: string[];
  onSelectJD: () => void;
}

export function JDUploadCard({
  title,
  description,
  buttonText,
  infoTitle,
  items,
  onSelectJD,
}: JDUploadCardProps) {
  return (
    <UploadCardBase
      variant="jd"
      title={title}
      description={description}
      buttonText={buttonText}
      infoTitle={infoTitle}
      items={items}
      isBusy={false}
      statusNode={null}
      onButtonClick={onSelectJD}
    />
  );
}
