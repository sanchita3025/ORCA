def calculate_risk(sst, chlorophyll, pfz_available):
    """
    Simple rule-based marine risk assessment.
    """

    score = 0
    reasons = []

    # SST assessment
    if sst is not None:
        if sst >= 30:
            score += 20
            reasons.append("High sea surface temperature.")
        elif sst >= 28:
            score += 10
            reasons.append("Moderately warm sea surface temperature.")

    # Chlorophyll assessment
    if chlorophyll is not None:
        if chlorophyll < 0.2:
            score += 10
            reasons.append("Low chlorophyll concentration.")
        elif chlorophyll >= 0.5:
            score -= 5
            reasons.append("Favourable chlorophyll concentration.")

    # PFZ assessment
    if pfz_available:
        score -= 10
        reasons.append("Potential Fishing Zone is available.")
    else:
        score += 10
        reasons.append("No Potential Fishing Zone detected.")

    # Keep score between 0 and 100
    score = max(0, min(score, 100))

    # Risk level
    if score >= 60:
        level = "HIGH"
    elif score >= 30:
        level = "MODERATE"
    else:
        level = "LOW"

    return {
        "score": score,
        "level": level,
        "reasons": reasons
    }